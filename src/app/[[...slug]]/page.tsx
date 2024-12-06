import HeaderSection from "@/components/HeaderSection";
import ImageAndTextSection from "@/components/ImageAndTextSection";
import {getClient} from "@/ApolloClient";
import {GetPageBySlugDocument, GetPageBySlugQuery} from "@/gql/graphql";
import {getPreprHeaders} from "@preprio/prepr-nextjs";
import {notFound} from "next/navigation";

async function getData(slug: string) {
    const {data} = await getClient().query<GetPageBySlugQuery>({
        query: GetPageBySlugDocument,
        variables: {
            slug: slug,
        },
        context: {
            // Call the getPreprHeaders function to get the appropriate headers
            headers: await getPreprHeaders()
        },
        fetchPolicy: 'no-cache',
    })

    if (!data) {
        return notFound()
    }

    return data
}

export default async function Page({params}: { params: { slug: string | string[] } }) {
    let {slug} = params

    if (!slug) {
        slug = '/'
    }

    if (slug instanceof Array) {
        slug = slug.join('/')
    }

    const data = await getData(slug)
    const elements = data.Page?.stack.map((element, index) => {
        if (element.__typename === 'SectionImageAndText') {
            return <ImageAndTextSection key={index} data={element}/>
        } else if (element.__typename === 'SectionHeader') {
            return <HeaderSection key={index} data={element}/>
        }
    })


    return (
        <div>
            {elements}
        </div>
    );
}
