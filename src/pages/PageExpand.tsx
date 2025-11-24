import { TiltedBackgroundCard } from "../components/TiltedBackgroundCard";

export const PageExpand = () => {
	return (
		<div className="flex gap-2 justify-center flex-wrap items-start">
			<TiltedBackgroundCard>
				<p>This is a test of this card.</p>
			</TiltedBackgroundCard>
			<TiltedBackgroundCard>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Ipsum sed omnis nulla facilis tempore aperiam perferendis
					iusto, porro molestias autem ratione aliquam ducimus
					distinctio rem cumque minus sint, maxime ut! is a test
				</p>
			</TiltedBackgroundCard>
			<TiltedBackgroundCard>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Ipsum sed omnis nulla facilis tempore aperiam perferendis
					iusto, porro molestias autem ratione aliquam ducimus
					distinctio rem cumque minus sint, maxime ut! is a test.
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Odio nostrum praesentium doloremque commodi, numquam
					incidunt porro debitis quam. Officiis nihil reiciendis
					necessitatibus aut, illo delectus harum itaque iure quo eos.
				</p>
			</TiltedBackgroundCard>
		</div>
	);
};
