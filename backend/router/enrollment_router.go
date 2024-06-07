package router

import (
	"myapp/controllers"
	"myapp/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupEnrollRouter(r *gin.Engine, db *gorm.DB) *gin.Engine {
	enrollmentService := services.NewEnrollmentService(db)
	enrollmentController := controllers.NewEnrollmentController(enrollmentService)

	r.POST("/enroll", enrollmentController.EnrollUserInCourse)
	r.DELETE("/enrollments/:user_id/:course_id", enrollmentController.UnenrollUserFromCourse)
	r.GET("/enrollments", enrollmentController.GetAllEnrollments)

	return r
}
