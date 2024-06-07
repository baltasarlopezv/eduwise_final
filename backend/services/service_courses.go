package services

import (
	"myapp/dtos"
	"myapp/models"

	"gorm.io/gorm"
)

type CourseService struct {
	db *gorm.DB
}

func NewCourseService(db *gorm.DB) *CourseService {
	return &CourseService{
		db: db,
	}
}

func (s *CourseService) GetAllCourses() ([]models.Course, error) {
	var courses []models.Course
	if err := s.db.Find(&courses).Error; err != nil {
		return nil, err
	}
	return courses, nil
}

func (s *CourseService) CreateCourse(dto dtos.CoursesDTO) (*models.Course, error) {
	course := &models.Course{
		Name:        dto.Name,
		Length:      dto.Length,
		Keywords:    dto.Keywords,
		Description: dto.Description,
		Req:         dto.Req,
		Teachername: dto.Teachername,
	}
	if err := s.db.Create(course).Error; err != nil {
		return nil, err
	}
	return course, nil
}

func (s *CourseService) GetCourseByID(id uint) (*models.Course, error) {
	var course models.Course
	if err := s.db.First(&course, id).Error; err != nil {
		return nil, err
	}
	return &course, nil
}

func (s *CourseService) GetCourseByName(name string) (*models.Course, error) {
	var course models.Course
	if err := s.db.Where("name = ?", name).First(&course).Error; err != nil {
		return nil, err
	}
	return &course, nil
}

func (s *CourseService) UpdateCourse(id uint, dto dtos.CoursesDTO) (*models.Course, error) {
	var course models.Course
	if err := s.db.First(&course, id).Error; err != nil {
		return nil, err
	}
	course.Name = dto.Name
	course.Length = dto.Length
	course.Keywords = dto.Keywords
	course.Description = dto.Description
	course.Req = dto.Req
	course.Teachername = dto.Teachername
	if err := s.db.Save(&course).Error; err != nil {
		return nil, err
	}
	return &course, nil
}

func (s *CourseService) DeleteCourse(id uint) error {
	if err := s.db.Delete(&models.Course{}, id).Error; err != nil {
		return err
	}
	return nil
}

func (s *CourseService) SearchCourses(query string) ([]models.Course, error) {
	var courses []models.Course

	// Realizar consulta con LIKE para todas las columnas
	searchQuery := "%" + query + "%"
	err := s.db.Where("name LIKE ? OR keywords LIKE ? OR description LIKE ?", searchQuery, searchQuery, searchQuery).Find(&courses).Error
	if err != nil {
		return nil, err
	}

	// Eliminar duplicados
	courses = removeDuplicates(courses)

	return courses, nil
}

// Función para eliminar duplicados de un slice de cursos
func removeDuplicates(courses []models.Course) []models.Course {
	// Mapa para rastrear los IDs de cursos ya vistos
	seenCourses := make(map[uint]bool)

	// Slice para almacenar cursos sin duplicados
	uniqueCourses := make([]models.Course, 0)

	// Iterar sobre los cursos originales
	for _, course := range courses {
		// Verificar si el curso ya ha sido visto
		if !seenCourses[course.ID] {
			// Si no ha sido visto, agregarlo al slice único y marcar su ID como visto
			uniqueCourses = append(uniqueCourses, course)
			seenCourses[course.ID] = true
		}
	}

	return uniqueCourses
}
