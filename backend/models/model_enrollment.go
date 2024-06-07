package models

import "time"

type Enrollment struct {
	UserID   uint      `gorm:"foreignKey:ID"`
	CourseID uint      `gorm:"foreignKey:ID"`
	Date     time.Time `gorm:"type:datetime"`
}
