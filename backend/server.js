const app = require('./app');
const supabase = require('./database/supabase')

// Basic route
app.get('/', (req, res) => {
    res.send('RapidCart API is running');
});

app.get('/users', async (req, res) => {
    try {
        const { data:users , error } = await supabase.from('users').select('*');
        if (error) throw error;
        return res.send(users);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});