import { PolarisTutrialDB } from "../../db/polaris-tutrial-db.js";

export async function adminRegister(req, res){
    console.log("=== adminRegister START ===");
    try{
        const body = req.body;
        console.log(body);
        const {name, email, password} = body;
        //PolarisTutrialDBに管理者作成処理を追加
        const admin = await PolarisTutrialDB.createAdmin(name, email, password);
        console.log({admin});
        if (admin.error){
            retur(400).json({ register: "fail", message: admin.error})
        }
        return res.status(200).json({ register:"success", admin });
    }catch(error){
        console.log("=== adminRegister ERROR ===")
        console.log(error)
        return res.status(500).json({register:"fail", message: error.message});

    }
}