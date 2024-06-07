package router

import (
	"myapp/controllers"
	"myapp/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func SetupUserRouter(r *gin.Engine, db *gorm.DB) *gin.Engine {

	userService := services.NewUserService(db)
	userController := controllers.NewUserController(userService)

	r.GET("/users", userController.GetUsers)
	r.POST("/user", userController.CreateUser)
	r.PUT("/user/:id", userController.UpdateUser)
	r.DELETE("/user/:id", userController.DeleteUser)

	return r

}
