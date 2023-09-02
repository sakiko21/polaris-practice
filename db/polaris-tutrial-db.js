import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();
import bcrypt from "bcryptjs";

console.log("=== db/polaris-tutrial-db.js ===", process.env.DATABASE_URL);

export const PolarisTutrialDB = {
    connect: async () => {
        const client = new pg.Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        });
        await client.connect();
        return client;
    },
    init: async () => {
            const client = await PolarisTutrialDB.connect();
            const hasAdminsTable = await client.query(
                "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'admins' AND table_schema = 'public');"
            );
            if (!hasAdminsTable.rows[0].exists) {
                await client.query(
                    `CREATE TABLE admins (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        email VARCHAR(255) NOT NULL,
                        password VARCHAR(255) NOT NULL
                    );`
                );
            }        
            await client.end();
    },
    createAdmin: async (name, email, password) => {
        try{
            const client = await PolarisTutrialDB.connect();
            const admin = await PolarisTutrialDB.getAdminByEmail(email);
            console.log({admin});
            if (admin){
                return {error:"このメールアドレスはすでに登録されています"};
            }else{
                password = await bcrypt.hash(password, 10);
                const newAdmin = await client.query(
                    "INSERT INTO admins (name, email, password) VALUES ($1, $2, $3) RETURNING *;",
                    [name, email, password]
                );
                return newAdmin.rows[0];
            }
        } catch (error){
            console.log("=== createAdmin Error===")
            console.log(error);
        }
    },
    getAdminByEmail: async (email) => {
        try{
            const client = await PolarisTutrialDB.connect();
            const admin = await client.query(
                "SELECT * FROM admins WHERE email = $1;",
                [email]
            );
            return admin.rows[0];
        } catch (error){
            console.log("=== getAdminByEmail Error===")
            console.log(error);
        }
    }
}