package router

import (
	"myapp/controllers"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupCourseRouter(r *gin.Engine, db *gorm.DB) *gin.Engine {

	courseController := controllers.NewCourseController(db)

	r.GET("/courses", courseController.GetCourses)
	r.POST("/courses", courseController.CreateCourse)
	r.PUT("/courses/:id", courseController.UpdateCourse)
	r.DELETE("/courses/:id", courseController.DeleteCourse)
	r.GET("/courses/name/:name", courseController.FindCourseByName)

	return r
}
