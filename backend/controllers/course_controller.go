package controllers

import (
	"myapp/dtos"
	"myapp/services"
	"net/http"
	"strconv"

	"gorm.io/gorm"

	"github.com/gin-gonic/gin"
)

type CourseController struct {
	courseService *services.CourseService
}

func NewCourseController(db *gorm.DB) *CourseController {
	return &CourseController{
		courseService: services.NewCourseService(db),
	}
}

func (cc *CourseController) GetCourses(c *gin.Context) {
	courses, err := cc.courseService.GetAllCourses()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, courses)
}

func (cc *CourseController) CreateCourse(c *gin.Context) {
	var dto dtos.CoursesDTO
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	course, err := cc.courseService.CreateCourse(dto)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, course)
}

func (cc *CourseController) UpdateCourse(c *gin.Context) {
	var dto dtos.CoursesDTO
	if err := c.ShouldBindJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid course id"})
		return
	}

	course, err := cc.courseService.UpdateCourse(uint(id), dto)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, course)
}

func (cc *CourseController) DeleteCourse(c *gin.Context) {
	id, err := strconv.ParseUint(c.Param("id"), 10, 32)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid course id"})
		return
	}

	if err := cc.courseService.DeleteCourse(uint(id)); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "course deleted successfully"})
}

func (cc *CourseController) FindCourseByName(c *gin.Context) {
	name := c.Param("name")
	course, err := cc.courseService.GetCourseByName(name)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "course not found"})
		return
	}
	c.JSON(http.StatusOK, course)
}
