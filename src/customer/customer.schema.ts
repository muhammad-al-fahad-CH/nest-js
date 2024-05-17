import * as mongooose from 'mongoose';

const customerSchema = new mongooose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    phone: String,
    address: String,
    description: String,
    created_at: { type: Date, default: Date.now }
});

export default customerSchema;