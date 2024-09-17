const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tagsData = await Tag.findAll({
    include: [{ model: Product }]
  });
  res.json(tagsData);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const singleTagData = await Tag.findByPk(req.params.id, {
    include: [{ model: Product }]
  });
  res.json({ message: 'No Tags found'});
});

router.post('/', async (req, res) => {
  // create a new tag
  await Tag.create(req.body)
  .then((tag) => {
    res.json(tag);
  });
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  await Tag.update(req.body)
  .then((tag) => {
    res.json(tag);
  })
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const singleTagData = await Tag.destroy({
    where: {
      id: req.params.id
    }
  });
});

module.exports = router;
