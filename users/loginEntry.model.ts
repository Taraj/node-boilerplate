import { Model } from 'objection';
import { User } from './user.model';

export class LoginEntry extends Model {
    static get tableName() {
        return 'login_entries';
    }
    user!: User;
    user_id!: number;
    token!: string;
    expiryDate!: Date;
    creationDate!: Date;


    static get jsonSchema() {
        return {
            type: 'object',
            required: ['token', 'expiryDate', 'creationDate']
        };
    }

    static get relationMappings() {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: {
                    from: 'login_entries.user_id',
                    to: 'users.id'
                }
            }
        }
    }
}