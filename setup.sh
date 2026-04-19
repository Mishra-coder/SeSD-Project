#!/bin/bash

echo "========================================="
echo "Task Management System - Setup Script"
echo "========================================="
echo ""

echo "Step 1: Installing frontend dependencies..."
npm install
echo "Frontend dependencies installed!"
echo ""

echo "Step 2: Installing backend dependencies..."
cd backend
npm install
echo "Backend dependencies installed!"
echo ""

echo "Step 3: Setting up environment files..."
cd ..
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Frontend .env file created"
fi

cd backend
if [ ! -f .env ]; then
    cp .env.example .env
    echo "Backend .env file created"
fi
cd ..
echo ""

echo "========================================="
echo "Setup Complete!"
echo "========================================="
echo ""
echo "Next steps:"
echo "1. Create PostgreSQL database: createdb taskmanagement"
echo "2. Update backend/.env with your database credentials"
echo "3. Start backend: cd backend && npm run dev"
echo "4. Start frontend: npm start"
echo ""
echo "Default test accounts will be created on first run:"
echo "- Admin: admin@taskmanagement.com / admin123"
echo "- Manager: manager@taskmanagement.com / manager123"
echo "- Member: member@taskmanagement.com / member123"
echo ""