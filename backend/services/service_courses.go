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
