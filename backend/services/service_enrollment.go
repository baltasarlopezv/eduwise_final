package services

import (
	"myapp/dtos"
	"myapp/models"
	"time"

	"gorm.io/gorm"
)

type EnrollmentService struct {
	db *gorm.DB
}

func NewEnrollmentService(db *gorm.DB) *EnrollmentService {
	return &EnrollmentService{db: db}
}

func (s *EnrollmentService) EnrollUserInCourse(userID, courseID uint) error {
	enrollment := &models.Enrollment{
		UserID:   userID,
		CourseID: courseID,
		Date:     time.Now(),
	}
	return s.db.Create(enrollment).Error
}

func (s *EnrollmentService) UnenrollUserFromCourse(userID, courseID uint) error {
	enrollment := &models.Enrollment{
		UserID:   userID,
		CourseID: courseID,
	}

	// Primero, verifica si la inscripción existe
	result := s.db.Where("user_id = ? AND course_id = ?", userID, courseID).Delete(enrollment)
	if result.RowsAffected == 0 {
		return gorm.ErrRecordNotFound
	}

	return result.Error
}

// GET INSCRIPCIONES
func (s *EnrollmentService) GetAllEnrollments() ([]dtos.EnrollmentsDTO, error) {
	var enrollments []models.Enrollment
	if err := s.db.Find(&enrollments).Error; err != nil {
		return nil, err
	}

	var enrollmentDTOs []dtos.EnrollmentsDTO
	for _, enrollment := range enrollments {
		enrollmentDTO := dtos.EnrollmentsDTO{
			UserID:   enrollment.UserID,
			CourseID: enrollment.CourseID,
			Date:     enrollment.Date.Format("2006-01-02 15:04:05"), // Convertir a string aquí
		}
		enrollmentDTOs = append(enrollmentDTOs, enrollmentDTO)
	}

	return enrollmentDTOs, nil
}
