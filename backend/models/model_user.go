package models

type User struct {
	ID       uint   `gorm:"primaryKey"`
	Name     string `gorm:"size:255"`
	Email    string `gorm:"size:255;unique"`
	Role     string `gorm:"size:255"`
	Password string `gorm:"size:255"` // Atributo que no se transfiere

}
