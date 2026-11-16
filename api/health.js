module.exports = (req, res) => {
  res.status(200).json({
    status: 'online',
    assistant: 'Aura',
    brand: 'Richie Rich Event',
    languages: ['fr', 'en', 'hi'],
    timestamp: new Date().toISOString()
  });
};
