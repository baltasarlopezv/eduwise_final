package controllers

import (
	"myapp/services"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type EnrollmentController struct {
	EnrollmentService *services.EnrollmentService
}

func NewEnrollmentController(enrollmentService *services.EnrollmentService) *EnrollmentController {
	return &EnrollmentController{EnrollmentService: enrollmentService}
}

func (ec *EnrollmentController) EnrollUserInCourse(c *gin.Context) {
	var enrollmentRequest struct {
		UserID   uint `json:"user_id"`
		CourseID uint `json:"course_id"`
	}

	if err := c.ShouldBindJSON(&enrollmentRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := ec.EnrollmentService.EnrollUserInCourse(enrollmentRequest.UserID, enrollmentRequest.CourseID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to enroll user in course"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User enrolled in course successfully"})
}

func (ec *EnrollmentController) UnenrollUserFromCourse(c *gin.Context) {
	userID, err := strconv.Atoi(c.Param("user_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user ID"})
		return
	}

	courseID, err := strconv.Atoi(c.Param("course_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid course ID"})
		return
	}

	err = ec.EnrollmentService.UnenrollUserFromCourse(uint(userID), uint(courseID))
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Enrollment not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User unenrolled from course successfully"})
}

func (ec *EnrollmentController) GetAllEnrollments(c *gin.Context) {
	enrollmentDTOs, err := ec.EnrollmentService.GetAllEnrollments()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, enrollmentDTOs)
}
