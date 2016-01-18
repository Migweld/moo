var request = require('superagent');
var expect = require('expect');

describe('moo', function () {
	it('should return a response', function() {
		
	});
});

describe('POST / send JSON with token and some text', function() {
	it('Should respond with a cow saying some text', function(done){
		var text = 'the cow says Moo';
		request.post(process.env.URL)
			.type('json')
			.send({"token": process.env.SLACK_TOKEN, "text": text})
			.end(function(err,res){
				expect(res.status).toBe(200);
				expect(res.text).toInclude(text);
			    done();
			});	
	});
});

describe('POST / send JSON with token but no text', function() {
	it('Should return an error', function(done){
		request.post(process.env.URL)
			.type('json')
			.send({"token": "xoxp-2520761847-2521679878-18784221010-76381320c8", "text": ''})
			.end(function(err, res){
				expect(res.status).toBe(400);
				expect(res.text).toEqual('You must give the cow something to say!');
				done();
			});
	});
});

describe('Send a GET request', function(){
	it('Should return an error', function(done){
		request.get(process.env.URL)
		.end(function(err, res){
			expect(res.status).toBe(405);
			expect(res.text).toEqual('Method not allowed');
			done();
		});
	})
});