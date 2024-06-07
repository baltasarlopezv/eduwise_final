package models

type Course struct {
	ID          uint    `gorm:"primaryKey"`
	Name        string  `gorm:"size:255"`
	Length      float32 `gorm:"size:255"`
	Keywords    string  `gorm:"size:255"`
	Description string  `gorm:"size:255"`
	Req         string  `gorm:"size:255"` //requerimientos
	Teachername string  `gorm:"size:255"`
}
