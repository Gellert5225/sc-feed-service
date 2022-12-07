const viewModel = require('./app.service');

module.exports = function(app, upload) {
	app.get('/', async (req, res) => {  
		try {
            const feeds = await viewModel.getFeeds();
            res.status(200).json({ 
				code: 200,
				info: feeds, 
				error: null 
			});
        } catch (error) {
            if (!error.status) error.status = 500;
            res.status(error.status).json({ 
				code: error.status, 
				info: 'error', 
				error: error.message 
			});
        }
	});

	app.post('/', async function(req, res) {
		upload(req, res, async (err) => {
			if (err) { 
				return res.status(400).json({ 
					code: err.code, 
					info: 'error', 
					error: err
				}); 
			}
			try {
				const result = await viewModel.postFeed({ 
					files: req.files, 
					body: JSON.parse(req.body.body) 
				});
				res.status(201).json({ 
					code: 200, 
					info: result, 
					error: null 
				});
			} catch (error) {
				if (!error.status) error.status = 500;
				res.status(error.status).json({ 
					code: error.status, 
					info: 'error', 
					error: error.message 
				});
			}
		});
	});

	app.put('/:id/likes', async function(req, res) {
			try {
				const result = await viewModel.putFeed({ 
					feed_id: req.params.id, 
					user_id: req.body.userId, 
					amount: req.body.amount 
				});
				if (!result.lastErrorObject.updatedExisting && result.lastErrorObject.n === 0)
					res.status(404).json({ 
						code: 404, 
						info: 'error', 
						error: `Could not find object with id ${req.params.id}` 
					});
				if (!result.lastErrorObject.updatedExisting)
					res.status(500).json({ 
						code: 500, 
						info: 'error', 
						error: 'Internal server error' 
					});

				res.status(200).json({ 
					code: 200, 
					info: result.value, 
					error: null 
				});
			} catch (error) {
				if (!error.status) error.status = 500;
				res.status(error.status).json({ 
					code: error.status, 
					info: 'error', 
					error: error.message 
				});
			}
	});

	app.post('/:id/comments', async function(req, res) {
		try {
			const result = await viewModel.postComment({ 
				text: req.body.text, 
				commenter: req.body.commenter, 
				feed_id: req.params.id 
			});
			res.status(200).json({ 
				code: 200, 
				info: result, 
				error: null 
			});
		} catch (error) {
			if (!error.status) error.status = 500;
			res.status(error.status).json({ 
				code: error.status, 
				info: 'error', 
				error: error.message 
			});
		}
	});

	app.get('/:id/comments', async function(req, res) {
		try {
			const result = await viewModel.getComments({ 
				feed_id: req.params.id 
			});
			res.status(200).json({ 
				code: 200, 
				info: result, 
				error: null 
			});
		} catch (error) {
			if (!error.status) error.status = 500;
			res.status(error.status).json({ 
				code: error.status, 
				info: 'error', 
				error: error.message 
			});
		}
	});
}