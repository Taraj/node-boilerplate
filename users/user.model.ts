import { Model } from 'objection';
import { LoginEntry } from './loginEntry.model';

export class User extends Model {
    static get tableName() {
        return 'users';
    }

    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string
    loginEntries!: LoginEntry[];

    static get relationMappings() {
        return {
            loginEntries: {
                relation: Model.HasManyRelation,
                modelClass: LoginEntry,
                join: {
                    from: 'users.id',
                    to: 'login_entries.user_id'
                }
            }
        }
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['firstName', 'lastName', 'email', 'password'],

            properties: {
                firstName: { type: 'string', minLength: 1, maxLength: 255 },
                lastName: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'string', format: 'email' },
                password: { type: 'string', minLength: 1, maxLength: 255 },
            }
        };
    }

}