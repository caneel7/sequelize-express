import { Column, DataType, Default, Model, PrimaryKey, Table, Sequelize } from 'sequelize-typescript'

@Table({tableName:'users',modelName:'User',timestamps:false})
export default class User extends Model<User>{

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column(DataType.CHAR)
    id: string


    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    first_name: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    last_name: string

    @Column({
        allowNull: false,
        type: DataType.STRING,
        unique: true
    })
    email: string

    @Column({
        allowNull:true,
        type: DataType.STRING,
    })
    password: string

    @Column({
        type: DataType.INTEGER,
        allowNull:false,
        defaultValue:1
    })
    is_active: boolean

    @Column({
        type: DataType.INTEGER,
        allowNull:false,
        defaultValue:0
    })
    google_user: boolean

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: new Date()
    })
    created_at: Date

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: new Date()
    })
    updated_at: Date

}

