import React from "react";
import { useRouter } from "next/router";
import { EntryBox, Container } from "@components";
import Link from "next/link";

const Home: React.FC = () => {
    const [value, setValue] = React.useState<string>("");
    const router = useRouter();
    const handleSubmit: React.FormEventHandler = (event) => {
        event.preventDefault();
        router.push("/" + value);
    };
    const onChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Container className="items-center">
            <h1 className="text-3xl md:text-5xl text-center mt-14 md:mt-18 ">
                EMSA Gazi Results 🚀
            </h1>
            <div className="mt-12 md:mt-28">
                <EntryBox
                    onChange={onChange}
                    onSubmit={handleSubmit}
                    value={value}
                />
            </div>
            <div className="mt-12 md:mt-24 text-xl">
                created by:{" "}
                <Link href="https://github.com/atlj">
                    <a>atlj 💫</a>
                </Link>
            </div>
        </Container>
    );
};

export default Home;
