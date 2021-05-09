import React from "react";
import firebase from "@data/firebase";
import { useRouter } from "next/router";
import { Container, Loading } from "@components";

interface option {
    name: string;
    icon: string;
    propName?: string;
}
interface pageData {
    amount: number;
    title: string;
    options: Array<option>;
}

interface repeat {
    [prop: string]: number;
}
interface rules {
    repeat: repeat;
}

interface voteData {
    name: string;
    icon: string;
    rules?: rules;
    pages: Array<pageData>;
}

type answers = Array<Array<number>>;
interface answersPool {
    [id: string]: answers;
}

interface PageResults {
    pageIndex: number;
    pageData: pageData;
}

const Main = () => {
    const router = useRouter();

    const [questionsData, setquestionsData] = React.useState<voteData>();
    const [answersPool, setanswersPool] = React.useState<answersPool>(); //TODO THIS WILL COME FROM DATABASE.

    const getAnswers = () => {
        firebase
            .database()
            .ref("answers")
            .child(router.query.id + "")
            .on("value", (response) => {
                if (response.val() !== null) {
                    setanswersPool(response.val());
                }
            });
    };

    React.useEffect(() => {
        firebase
            .database()
            .ref("questions")
            .child(router.query.id + "")
            .once("value", (response) => {
                if (response.val() !== null) {
                    setquestionsData(response.val());
                    getAnswers();
                } else {
                    router.push("/notfound");
                }
            });
        return firebase
            .database()
            .ref("answers")
            .child(router.query.id + "")
            .off("value");
    }, []);

    const answersData = React.useMemo<answers>(() => {
        if (questionsData !== undefined) {
            let schema: answers = [];

            for (let index = 0; index < questionsData.pages.length; index++) {
                const element = questionsData.pages[index];
                let innerlist: Array<number> = [];
                element.options.forEach((innerelement) => {
                    innerlist = [...innerlist, 0];
                });
                schema = [...schema, innerlist];
            }
            const answerValues = Object.values(answersPool);
            answerValues.forEach((userAnswers) => {
                for (let index = 0; index < userAnswers.length; index++) {
                    userAnswers[index].forEach((answer) => {
                        schema[index][answer] += 1;
                    });
                }
            });

            return schema;
        }
    }, [answersPool]);
    const Result = ({ name, count }: { name: string; count: number }) => {
        return (
            <div className="flex flex-col rounded-xl ">
                <div />
                <h3 className="self-center   text-center text-lg md:text-2xl  ">
                    {name}
                </h3>
                <h2 className="self-center text-accent text-2xl md:text-4xl md:mb-12 mb-6 font-semibold  ">
                    {count} oy
                </h2>
            </div>
        );
    };

    const PageResults = ({ pageIndex, pageData }: PageResults) => {
        return (
            <div className="flex flex-col ">
                <h2 className="text-xl md:text-3xl text-center mt-8 mb-4 md:mb-16 mx-4  ">
                    {pageData.title}
                </h2>
                <div className=" ">
                    <ul className="grid grid-cols-2 md:grid-cols-4   grid-flow-row ">
                        {pageData.options.map((option, index) => {
                            return (
                                <Result
                                    key={index}
                                    name={option.name}
                                    count={
                                        answersData !== undefined
                                            ? answersData[pageIndex][index]
                                            : 0
                                    }
                                />
                            );
                        })}
                    </ul>
                </div>
                <div className="h-0.5 bg-gray-500 w-3/5 my-8 md:my-12 self-center rounded-md shadow-lg" />
            </div>
        );
    };
    if (questionsData !== undefined) {
        return (
            <Container>
                <div className="flex self-center flex-col md:text-2xl text-center mt-2  text-white bg-accent rounded-lg px-4 py-2 ">
                    <h2>Toplam</h2>
                    <div className="flex flex-row">
                        <h2 className="mr-1 font-semibold  ">
                            {answersPool !== undefined
                                ? Object.values(answersPool).length
                                : 0}
                        </h2>
                        Kişi oy kullandı
                    </div>
                </div>
                <ul>
                    {questionsData.pages.map((data, index) => {
                        return (
                            <PageResults
                                key={index}
                                pageData={data}
                                pageIndex={index}
                            />
                        );
                    })}
                </ul>
            </Container>
        );
    } else {
        return (
            <Container className="justify-center items-center">
                <Loading />
            </Container>
        );
    }
};

export default Main;
