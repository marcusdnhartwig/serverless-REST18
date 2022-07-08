import {handler} from './index.js';

// insert
// handler({tableName: 'users', primaryKeyId:'marcus', action: 'insert', data: 'husband'});

// select a single user
handler({tableName: 'users', primaryKeyId:'marcus', action: 'select'});

// update a single user
// handler({tableName: 'users', primaryKeyId:'coder', action: 'update', data: 'husband'});

// delete a single user
// handler({tableName: 'users', primaryKeyId:'Marcus', action: 'delete'});


