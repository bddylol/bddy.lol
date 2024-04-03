import { createClient } from '@supabase/supabase-js';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	const { supabase, getSession } = locals;

	const session = await getSession();

	if (!session) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const userid = session.user.user_metadata.provider_id;
	const username = session.user.user_metadata.full_name;
	const avatar = session.user.user_metadata.avatar_url;

	const { data, error } = await supabase.from('vouches').select('*');

	if (error) {
		return json({ error: error.message }, { status: 500 });
	}

	function sortByCreatedAtDesc(jsonArray: any) {
		return jsonArray.sort((a: any, b: any) => {
			//@ts-ignore
			return new Date(b.created_at) - new Date(a.created_at);
		});
	}

	return json({ data: sortByCreatedAtDesc(data) });
};

export const POST: RequestHandler = async ({ locals, request }) => {
	const { supabase, getSession } = locals;
	const { review, stars } = await request.json();

	const session = await getSession();

	if (!session) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	if (typeof review !== 'string' || typeof stars !== 'number') {
		return json({ error: 'Invalid request. ' }, { status: 400 });
	}

	const userid = session.user.user_metadata.provider_id;
	const username = session.user.user_metadata.full_name;
	const avatar = session.user.user_metadata.avatar_url;

	if (stars < 1 || stars > 5) {
		return json({ error: 'Invalid stars. ' }, { status: 400 });
	}

	if (review.length > 60) {
		return json({ error: 'Review must not be more than 60 characters. ' }, { status: 400 });
	}

	// has the user already vouched?
	const { data: vouches, error: vouchesError } = await supabase
		.from('vouches')
		.select('*')
		.eq('user_id', userid);

	if (vouchesError) {
		return json({ error: vouchesError.message }, { status: 500 });
	}

	if (vouches.length > 0) {
		return json({ error: 'You have already vouched. ' }, { status: 400 });
	}

	const { data, error } = await supabase.from('vouches').insert({
		stars,
		review,
		user_id: userid,
		username,
		avatar_url: avatar
	});

	if (error) {
		return json({ error: error.message }, { status: 500 });
	}

	return json({ data });
};
