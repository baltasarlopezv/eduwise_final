package router

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"myapp/controllers"
	"myapp/services"
)

func SetupRouter(db *gorm.DB, jwtSecret string) *gin.Engine {
	r := gin.Default()

	authService := services.NewAuthService(db, jwtSecret)
	authController := controllers.NewAuthController(authService)

	r.POST("/login", authController.Login)

	return r
}
