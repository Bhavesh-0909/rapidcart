const supabase = require('../database/supabase');
const bcrypt = require('bcrypt');

/*
api endpoints for user
1. login
2. register
3. otp
3. logout
4. add address
5. get address
6. update address
7. delete address
8. get user
9. update user
10. delete user
11. forget reset
12. user session
*/

//Add user
exports.addUser = async (req, res) => {
    try {

        if (!req.body.email || !req.body.password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const userData = {
            email: req.body.email,
            password_hash: await bcrypt.hash(req.body.password, 10),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone: req.body.phone,
            role: user_role
        };

        const { data, error } = await supabase.from('users').insert([userData]);
        if (error) throw error;
        return res.status(201).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//Add address
exports.addAddress = async (req, res) => {
    try {
        if (!req.body.user_id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const addressData = {
            user_id: req.body.user_id,
            address_line1: req.body.address_line1,
            address_line2: req.body.address_line2,
            city: req.body.city,
            state: req.body.state,
            postal_code: req.body.postal_code,
            country: req.body.country,
            address_type: req.body.address_type
        };

        const { data, error } = await supabase.from('user_addresses').insert([addressData]);
        if (error) throw error;
        return res.status(201).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

//Get user
exports.getUser = async (req, res) => {
    try {
        if (!req.params.id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const { data, error } = await supabase.from('users').select('*').eq('id', req.params.id);
        if (error) throw error;
        return res.send(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}