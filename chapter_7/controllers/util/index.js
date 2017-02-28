class Util {
	construct() {}

	getRawRes() {
		return {
			data: null,
			status: '',
			msg: '',
			timestamp: Date.now()
		};
	}

	errorHandler() {
		return function* (next) {
			try {
				yield next;
			} catch(error) {
				console.error(error);
				this.status = 500;
				this.body = {
					data: null,
					status: 'ERROR',
					msg: '服务器内部错误',
					timestamp: Date.now()
				};
			}
		};
	}

	failureRes(data = null, message = '') {
		let rt = this.getRawRes();
		rt.data = data;
		rt.status = 'ERROR';
		rt.msg = message;
		return rt;
	}

	successRes(data = null, message = '') {
		let rt = this.getRawRes();
		rt.data = data;
		rt.status = 'SUCCESS';
	    rt.msg = message;
	    return rt;
	}
}

const util = new Util();

module.exports = util;