// Import Router from express and models from the database
const router = require('express').Router();
// Import Summaries, Notes model from the models directory
const { Summaries, Notes } = require('../../models');

// GET route to retrieve all summaries
router.get('/', async (req, res) => {
  try {
    const summaryData = await Summaries.findAll({
      include: [{ model: Notes }],
    });
    res.status(200).json(summaryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route to find a single summary by its noteId
router.get('/:noteId', async (req, res) => {
  try {
    const summaryData = await Summaries.findByPk(req.params.noteId, {
      include: [{ model: Notes }],
    });
    if (!summaryData) {
      res.status(404).json({ message: 'No summary found for this note id!' });
      return;
    }
    res.status(200).json(summaryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route to create a new summary
router.post('/', async (req, res) => {
    try {
      const summaryData = await Summaries.create({
        noteId: req.body.noteId,
        summary: req.body.summary,
      });
      res.status(200).json(summaryData);
    } catch (err) {
      res.status(400).json(err);
    }
  });
  
  // PUT route to update an existing summary by noteId
  router.put('/:noteId', async (req, res) => {
    try {
      const summaryData = await Summaries.update(req.body, {
        where: { noteId: req.params.noteId },
      });
      if (summaryData[0] === 0) {
        res.status(404).json({ message: 'No summary found with this note id!' });
        return;
      }
      res.status(200).json({ message: 'Summary updated successfully!' });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // DELETE route to remove a summary by noteId
  router.delete('/:noteId', async (req, res) => {
    try {
      const summaryData = await Summaries.destroy({
        where: { noteId: req.params.noteId },
      });
      if (!summaryData) {
        res.status(404).json({ message: 'No summary found with this note id!' });
        return;
      }
      res.status(200).json({ message: 'Summary deleted successfully!' });
    } catch (err) {
      res.status(500).json(err);
    }
  });  

module.exports = router;