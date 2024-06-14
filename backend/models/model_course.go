package models

type Course struct {
	ID          uint   `gorm:"primaryKey"`
	Name        string `gorm:"size:255"`
	Length      int    `gorm:"size:255"`
	Keywords    string `gorm:"size:255"`
	Desc        string `gorm:"size:255"`
	Req         string `gorm:"size:255"` //requerimientos
	TeacherName string `gorm:"size:255"`
}
