package dtos

type CoursesDTO struct {
	Name        string `json:"name"`
	Length      int    `json:"Length"`
	Keywords    string `json:"keywords"`
	Desc        string `json:"description"`
	Req         string `json:"req"`
	TeacherName string `json:"teachername"`
}
