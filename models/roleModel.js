const mongoose = require('../config/db');

const roleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
});

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;

const roleData = [
    {
        name: 'Admin',
        slug: 'admin',
        description: 'this role for admin'
    },
    {
        name: 'User',
        slug: 'user',
        description: 'this role is for user'
    },
    {
        name: 'Author',
        slug: 'author',
        description: 'this role is for author'
    }
];

async function seed() {
    try {
        // Clear existing data
        await Role.deleteMany({});

        // Create roles
        await Role.create(roleData);
        console.log('Seed data inserted successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
}

//seed();