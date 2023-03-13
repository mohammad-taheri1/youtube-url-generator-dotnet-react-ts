using backend.Context;
using backend.Dtos;
using backend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        #region Constructor & Dependency Injection 
        // Access to DB
        private readonly ApplicationDbContext _context;

        public VideoController(ApplicationDbContext context)
        {
            _context = context;
        }
        #endregion


        // CRUD
        #region HttpPost CreateNewVideo 
        [HttpPost]
        public async Task<ActionResult<VideoEntity>> CreateNewVideo([FromBody]CreateVideoDto dto)
        {
            var newVideo = new VideoEntity()
            {
                Title = dto.Title,
                Url = CreateUniqueUrl()
            };

            await _context.Videos.AddAsync(newVideo);
            await _context.SaveChangesAsync();

            return Ok(newVideo);
        }
        #endregion

        #region HttpGet GetAllVideos
        [HttpGet]
        public async Task<ActionResult<List<VideoEntity>>> GetAllVideos()
        {
            var videos = await _context.Videos.OrderByDescending(q => q.CreatedAt).ToListAsync();

            return Ok(videos);
        }
        #endregion

        #region HttpGet GetVideoById 
        [HttpGet]
        [Route("{videoId}")]
        public async Task<ActionResult<VideoEntity>> GetVideoById([FromRoute]long videoId)
        {
            var video = await _context.Videos.FirstOrDefaultAsync(q => q.Id == videoId);

            if(video is null)
            {
                return NotFound("Video Not found");
            }

            return Ok(video); 
        }
        #endregion

        #region HttpPatch UpdateVideo 
        [HttpPatch]
        [Route("{videoId}")]
        public async Task<IActionResult> UpdateVideo([FromRoute] long videoId, [FromBody] CreateVideoDto dto)
        {
            var video = await _context.Videos.FirstOrDefaultAsync(q => q.Id == videoId);

            if (video is null)
            {
                return NotFound("Video Not found");
            }

            video.Title = dto.Title;
            await _context.SaveChangesAsync();

            return Ok("Video updated successfully");
        }
        #endregion

        #region HttpDelete DeleteVideo 
        [HttpDelete]
        [Route("{videoId}")]
        public async Task<IActionResult> DeleteVideo([FromRoute] long videoId)
        {
            var video = await _context.Videos.FirstOrDefaultAsync(q => q.Id == videoId);

            if (video is null)
            {
                return NotFound("Video Not found");
            }

            _context.Videos.Remove(video);

            await _context.SaveChangesAsync();

            return Ok("Video Deleted Successfully");
        }
        #endregion

        #region private string CreateUniqueUrl
        // Unique Url Generator function
        private string CreateUniqueUrl()
        {
            var newRandomUrl = string.Empty;
            Random rand = new Random();

            var boolFlag = true;

            while (boolFlag)
            {
                newRandomUrl = "";

                for (int i = 0; i < 10; i++)
                {
                    var randomNum = rand.Next(1,9);
                    var randomChar1 = (char)rand.Next('a','z');
                    var randomChar2 = (char)rand.Next('A','Z');
                    newRandomUrl += randomChar2.ToString();
                    newRandomUrl += randomChar1.ToString();
                    newRandomUrl += randomNum.ToString();
                }

                var isDuplicate = _context.Videos.Any(q => q.Url == newRandomUrl);

                if (!isDuplicate)
                {
                    boolFlag = false;
                }
            }

            return newRandomUrl;
        }
        #endregion
    }
}
