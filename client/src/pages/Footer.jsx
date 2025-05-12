import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
  const date = new Date()
  const d = date.getFullYear()
  return (
    <footer className="main-footer d-flex justify-content-center">
      <strong>© {d}  <Link >Milan Rawat.</Link></strong>
      <b>All rights reserved.</b>
    </footer>
  )
}

export default Footer