package main

import (
	"fmt"
	"log"
	"myapp/database"
	"myapp/router"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)

const port = 8000

func main() {

	// Conectar a la base de datos
	db := database.ConnectDB()
	// defer db.Close()
	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		log.Fatal("JWT_SECRET environment variable is required")
	}

	// Configurar el router
	r := gin.Default()
	router.SetupUserRouter(r, db)
	router.SetupCourseRouter(r, db)
	router.SetupEnrollRouter(r, db)

	// Iniciar el servidor
	err := http.ListenAndServe(fmt.Sprintf(":%d", port), r)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Server is running at http://localhost:8000")
}
