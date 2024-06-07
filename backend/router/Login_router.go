package router

import (
	"myapp/controllers"
	"myapp/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

//func SetupLoginRouter(db *gorm.DB, jwtSecret string) *gin.Engine {

// r := gin.Default()
func SetupLoginRouter(r *gin.Engine, db *gorm.DB, jwtSecret string) {

	authService := services.NewAuthService(db, jwtSecret)
	authController := controllers.NewAuthController(authService)

	r.POST("/login", authController.Login)

	// return r
}
