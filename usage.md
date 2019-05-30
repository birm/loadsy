# Parameters

* len or l - the number of records total
* txt or t - the number of text (sentence) attributes
* str or s - the number of string (single word) attributes
* int or i - the number of integer attributes
* float or f - the number of floating point attributes
* img or u - the number of image url fields

# example url
http://<base url>/?t=5&s=2&u=3&i=10&f=3&l=1000

# accessing attributes
Each record has attributes named after the single letter parameter code then a number ranging from 0 to one less than the number given
