/**
 * SPDX-FileCopyrightText: © 2019 Liferay, Inc. <https://liferay.com>
 * SPDX-License-Identifier: BSD-3-Clause
 */

const path = require('path');

const getMergedConfig = require('../utils/getMergedConfig');

const BUILD_CONFIG = getMergedConfig('npmscripts', 'build');
const CWD = process.cwd();

const INPUT = BUILD_CONFIG.input.replace('/', path.sep);
const OUTPUT = BUILD_CONFIG.output;

module.exports = function (request, options) {
	const {basedir, defaultResolver} = options;

	// Redirect imports to .soy.js files from input to output directory

	if (basedir.startsWith(CWD)) {
		if (/\.soy(?:\.js)?$/.test(request)) {
			const dir = basedir.replace(INPUT, OUTPUT);

			return path.join(
				dir,
				path.dirname(request),
				path.basename(request, '.js') + '.js'
			);
		}
	}

	// Fallback to default resolver

	return defaultResolver(request, options);
};
