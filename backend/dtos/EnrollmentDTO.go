package dtos

type EnrollmentsDTO struct {
	UserID   uint   `json:"user_id"`
	CourseID uint   `json:"course_id"`
	Date     string `json:"date"`
}
