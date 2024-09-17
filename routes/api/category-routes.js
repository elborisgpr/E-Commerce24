const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
    const categoriesData = await Category.findAll({
      include: [{model: Product}]
    });
    res.json(categoriesData);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const singleCategoryData = await Category.findByPk(req.params.id, {
    include: [{ model: Product }]
  });
  return;
  res.json(singleCategoryData);
});

router.post('/', async (req, res) => {
  // create a new category
 await Category.create(req.body)
  .then((Category) => {
    res.json(Category);
  });
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  await Category.update(req.body)
  .then((Category) => {
    res.json(Category);
  });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const singleCategoryData = await Category.destroy({
    where: {
      id: req.params.id
    }
  });
  res.json({ message: 'No Category found'})
});

module.exports = router;