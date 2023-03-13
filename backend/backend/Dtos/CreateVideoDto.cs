using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class CreateVideoDto
    {
        [MinLength(5)]
        public string Title { get; set; }
    }
}
