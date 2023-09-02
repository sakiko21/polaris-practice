import { HorizontalStack, Button, LegacyCard, Page } from "@shopify/polaris";
import { useEffect } from "react";

export default function HomePage(){
    useEffect(()=> {
        console.log("test");
    }, []) 
    return (
        <Page>
            <LegacyCard sectioned>
            <HorizontalStack gap="10" wrap={false} align="center">
                <Button url="/auth/login">ログイン</Button>
                <Button url="/auth/register" primary >新規登録</Button>
            </HorizontalStack>
            </LegacyCard>
        </Page>
    )
}
