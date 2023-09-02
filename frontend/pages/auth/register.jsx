import { Button, Form, FormLayout, LegacyCard, Page, Text, TextField } from "@shopify/polaris";
import {useState} from "react";
import {useField, useForm} from "@shopify/react-form";

export default function RegisterPage(){
    //name, email, password, passwordconfirmationのフォームを作成
    const {
        fields: {name, email, password, passwordConfirmation},
        dirty,
        submit,
        submitting,
        reset,
        makeClean
    } = useForm({
        fields: {
        name: useField({
            value: "",
            validates: [
                (name) => {
                    if (name.length < 1){
                    return "お名前を入力してください";
                    }
                }
            ],
        }),
        email: useField({
            value: "",
            validates: [
                (email) => {
                    if (email.length < 1) {
                        return "メールアドレスを入力してください";
                    }
                },
                (email) => {
                    if (!email.match(/.+@.+\..+/)){
                        return "メールアドレスの形式が正しくありません";
                    }
                }
            ],
        }),
        password: useField({
            value:"",
            validates:[
                (password) => {
                    if (password.length < 1){
                        return "パスワードを入力してください";
                    }
                },
                (password) => {
                    if (password.length < 6) {
                        return "パスワードは6文字以上で入力してください";
                    }
                }
            ],
        }),
        passwordConfirmation: useField({
            value:"",
            validates: [
                (passwordConfirmation) => {
                    if (passwordConfirmation.length < 1){
                        return "パスワードを入力して下さい";
                    }
                },
                (passwordConfirmation) => {
                    if (passwordConfirmation !== password.value){
                        return "パスワードが一致しません";
                    }
                }
            ],
        }),
    },
    async onSubmit (formDetails){
        delete formDetails.passwordConfirmation;//フロントでやっているので除外
        const streamData = await fetch("/api/auth/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDetails),
        });
        const response = await streamData.json();
        console.log({response});
        if(response.register == "success"){
            return {status: "success"}
        } else{
            return {status: "fail", errors: response.message };
        }
    },
    });



    return (
        <Page>
            <LegacyCard sectioned>
                <Text variant="headingLg">新規管理者登録</Text>
                <Form onSubmit={submit}>
                    <FormLayout>
                        <TextField
                            label="お名前"
                            type="text"
                            placeholder="例) 山田太郎"
                            requiredIndicator
                            value={name.value}
                            onChange={name.onChange}
                            error={name.error}
                        />
                        <TextField
                            label="メールアドレス"
                            type="email"
                            requiredIndicator
                            value={email.value}
                            onChange={email.onChange}
                            error={email.error}
                        />
                        <TextField
                            label="パスワード"
                            type="password"
                            requiredIndicator
                            value={password.value}
                            onChange={password.onChange}
                            error={password.error}
                        />
                        <TextField
                            label="パスワードの確認"
                            type="password"
                            requiredIndicator
                            value={passwordConfirmation.value}
                            onChange={passwordConfirmation.onChange}
                            error={passwordConfirmation.error}
                        />
                        <Button primary submit>新規登録</Button>
                    </FormLayout>
                </Form>
            </LegacyCard>
        </Page>
    )
}