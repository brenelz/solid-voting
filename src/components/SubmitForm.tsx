import { createResource, createSignal } from "solid-js";
import styles from "./SubmitForm.module.scss";

type SubmitFormProps = {
    title: string;
    numVotes: number;
}

async function postFormData(formData: FormData) {
    const response = await fetch("/submit-vote", {
        method: "POST",
        body: formData,
    });
    const data = await response.json();
    return data as { title: string, numVotes: number };
}

export const SubmitForm = (props: SubmitFormProps) => {
    const [formData, setFormData] = createSignal<FormData>();
    const [response] = createResource(formData, postFormData);

    function submit(e: SubmitEvent) {
        e.preventDefault();
        setFormData(new FormData(e.target as HTMLFormElement));
    }

    return (
        <form class={styles.submitForm} onSubmit={submit}>
            <input type="hidden" name="title" value={props.title} />
            <button type="submit" classList={{ voted: !!response.latest }}>
                <h2>
                    <span class="thumbs-up">👍</span>
                    ({!response.latest ? props.numVotes : response.latest?.numVotes}) - {props.title}
                </h2 >
            </button >
        </form >
    )
}

export default SubmitForm;