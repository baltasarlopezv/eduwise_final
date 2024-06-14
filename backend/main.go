package main

import (
	"fmt"
	"log"
	"myapp/database"
	"myapp/router"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

const port = 8000

func main() {
	// Cargar variables de entorno desde .env
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	// Conectar a la base de datos
	db := database.ConnectDB()
	// defer db.Close()
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		log.Fatal("JWT_SECRET environment variable is required")
	}

	// Configurar el router
	r := gin.Default()

	// Configurar CORS
	config := cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"*"},
		AllowHeaders:     []string{"Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}
	r.Use(cors.New(config))

	// Configurar rutas
	router.SetupUserRouter(r, db)
	router.SetupCourseRouter(r, db)
	router.SetupEnrollRouter(r, db)
	router.SetupLoginRouter(r, db, jwtSecret)

	// Iniciar el servidor
	err = http.ListenAndServe(fmt.Sprintf(":%d", port), r)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Server is running at http://localhost:8000")
}
