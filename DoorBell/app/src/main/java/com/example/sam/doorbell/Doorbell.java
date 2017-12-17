package com.example.sam.doorbell;

import retrofit2.Call;
import retrofit2.http.GET;

/**
 * Created by sam on 12/17/17.
 */

public interface Doorbell {
    @GET("call")
    Call<String> startCall();

}
