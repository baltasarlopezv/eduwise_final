package router

import (
	"myapp/controllers"
	"myapp/middleware"
	"myapp/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupEnrollRouter(r *gin.Engine, db *gorm.DB, jwtSecret string) *gin.Engine {
	enrollmentService := services.NewEnrollmentService(db)
	enrollmentController := controllers.NewEnrollmentController(enrollmentService)

	authMiddleware := middleware.AuthMiddleware(jwtSecret)

	r.POST("/enroll", authMiddleware, enrollmentController.EnrollUserInCourse)
	r.DELETE("/enrollments/:user_id/:course_id", authMiddleware, enrollmentController.UnenrollUserFromCourse)
	r.GET("/enrollments", authMiddleware, enrollmentController.GetAllEnrollments)
	r.GET("/enrollments/user_id/:user_id", authMiddleware, enrollmentController.GetEnrollmentsByUserId)

	return r
}
