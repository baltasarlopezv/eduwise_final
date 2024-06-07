package dtos

type CoursesDTO struct {
	Name        string  `json:"name"`
	Length      float32 `json:"length"`
	Keywords    string  `json:"keywords"`
	Description string  `json:"description"`
	Req         string  `json:"req"`
	Teachername string  `json:"teachername"`
}
