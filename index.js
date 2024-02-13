const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const EmployeModel = require('./model/model');
const { json } = require('body-parser');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/bank", {
  useNewUrlParser: true,
  useUnifiedTopology: true,

});
// Create a default admin user if it doesn't already exist
const adminUser = new EmployeModel({
  name: 'Admin',
  email: 'admin@example.com',
  password: '12345678',
  role: 'admin',
});

adminUser.save()
  .then(admin => {
    console.log('Default admin user created:', admin);
  })
  .catch(error => {
    console.error('Error creating default admin user:', error);
  });

app.get('/userdata', (req, res) => {
  const { email, password } = req.body;
  EmployeModel.find({ role: 'user'})
    .then(users => res.json(users))
    .catch(error => {
      console.error(error);
      res.status(500).json("Internal Server Error");
    });
});
app.get('/admindata', (req, res) => {
  const { email, password } = req.body;
  EmployeModel.find({ role: 'admin' })
    .then(admins => res.json(admins))
    .catch(error => {
      console.error(error);
      res.status(500).json("Internal Server Error");
    });
});
  
app.post('/login', (req, res) => {
  const { email, password, role } = req.body;
  EmployeModel.findOne({ email: email, role: role })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json("The password is incorrect");
        }
      } else {
        res.json("No record exists");
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json("Internal Server Error");
    });
});





app.post('/createaccount', (req, res) => {
  const { name, email, password} = req.body;
  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  // Check if the email already exists
  EmployeModel.findOne({ email: email })
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }
      
      // Create a new user
      const newUser = new EmployeModel({ name, email, password});
      newUser.save()
        .then(user => res.json(user))
        .catch(error => {
          console.error(error);
          res.status(500).json("Internal Server Error");
        });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json("Internal Server Error");
    });
});




app.post('/deposite', (req, res) => {
  const { deposit, Money } = req.body;

  // Here, you should update the user's account balance in the database.
  // You can use Mongoose to find the user and update their balance field.

  // Sample code (assuming you have a User model)
  EmployeModel.findOneAndUpdate(
    { email: req.body.email }, // You should use the user's email or another unique identifier
    { $inc: { balance: deposit } }, // Increment the balance by the deposit amount
    { new: true } // Get the updated user document
  )
    .then(updatedUser => {
      if (updatedUser) {
        res.json({ message: "Deposit successful", user: updatedUser });
      } else {
        res.status(404).json({ error: "User not found" });
      }
     })
    .catch(error => {
      console.error(error);
      res.status(500).json("Internal Server Error");
    });
});

// Withdraw route (similar to deposit)
app.post('/withdraw', (req, res) => {
  const { withdraw, Money } = req.body;

  // Here, you should update the user's account balance in the database.
  // You can use Mongoose to find the user and update their balance field.

  // Sample code (assuming you have a User model)
  EmployeModel.findOneAndUpdate(
    { email: req.body.email }, // You should use the user's email or another unique identifier
    { $inc: { balance: -withdraw } }, // Decrement the balance by the withdrawal amount
    { new: true } // Get the updated user document
  )
    .then(updatedUser => {
      if (updatedUser) {
        res.json({ message: "Withdrawal successful", user: updatedUser });
      } else {
        res.status(404).json({ error: "User not found" });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json("Internal Server Error");
    });
});






app.listen(3002, () => {
  console.log("Server is running on port 3002");
});





/*
const adminUser = new EmployeModel({
  name: 'Admin Name',
  email: 'admin@example.com',
  password: 'adminpassword',
  role: 'admin',
});

adminUser.save()
  .then(user => {
    console.log('Admin user created:', user);
  })
  .catch(error => {
    console.error('Error creating admin user:', error);
  });



  // Middleware to authenticate admin users
function authenticateAdmin(req, res, next) {
  const { email, password } = req.body;
  EmployeModel.findOne({ email: email, role: 'admin' }) // Check if the user is an admin
    .then(user => {
      if (user && user.password === password) {
        req.user = user; // Attach the user to the request object
        next(); // Proceed to the next middleware or route
      } else {
        res.status(401).json("Unauthorized"); // Unauthorized access
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).json("Internal Server Error");
    });
}

// Admin data page route
app.get('/admindata', authenticateAdmin, (req, res) => {
  // Retrieve and display all data for admin
  EmployeModel.find({})
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json("Internal Server Error");
    });
});

*/