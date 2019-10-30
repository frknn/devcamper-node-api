const advancedResults = (model, populate) => async (req, res, next) => {
  let query;

  let reqQuery = { ...req.query };

  // fields that will be removed from query
  let removedFields = ['select', 'sort', 'page', 'limit'];

  // remove unwanted fields from query
  removedFields.forEach(field => delete reqQuery[field]);
  console.log(reqQuery);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  /* \b is word boundary regex
    I used it to get a match with the options I gave in.
    Last 'g' is for global to catch all matches instead of just first match.
    Catching the keywords and adding $ at the begginig for mongoDB document querying.
  */
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  query = model.find(JSON.parse(queryStr));

  // Select fields
  if (req.query.select) {
    let selectedFields = req.query.select.replace(/,/g, ' ');
    query = query.select(selectedFields);
  }

  // Sort fields
  let sortFields = req.query.sort ? req.query.sort.replace(/,/g, ' ') : '-createdAt';
  query = query.sort(sortFields);


  // Pagination
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 25;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const totalDocs = await model.countDocuments();

  query = query.skip(startIndex).limit(limit);

  if(populate){
    query = query.populate(populate);
  }

  // Executing query
  const results = await query;

  // Pagination result
  const pagination = {};

  if (endIndex < totalDocs) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }

  res.advancedResults = {
    success: true,
    count: results.length,
    pagination,
    data: results
  }

  next();
};

module.exports = advancedResults;